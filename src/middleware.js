import { defineMiddleware } from "astro:middleware";
import { createClient } from "./lib/supabase";

export const onRequest = defineMiddleware(async (context, next) => {
  const supabase = createClient(context);
  const { data: { session } } = await supabase.auth.getSession();
  
  context.locals.supabase = supabase;
  context.locals.session = session;

  return next();
});