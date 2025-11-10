import { createClient } from "../../../lib/supabase";

export const POST = async (context) => {
  const supabase = createClient(context);
  await supabase.auth.signOut();
  return context.redirect("/login");
};