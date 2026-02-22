import { Controller, Get, Post, Body } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

@Controller('api/guestbook')
export class AppController {

  @Get()
  async getMessages() {
    const { data, error } = await supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return data;
  }

  @Post()
  async createMessage(@Body() body: { name: string; message: string }) {
    const { error } = await supabase
      .from('guestbook')
      .insert([{ name: body.name, message: body.message }]);

    if (error) throw new Error(error.message);
    return { success: true };
  }
}