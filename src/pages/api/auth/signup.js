import { createClient } from "../../../lib/supabase";

export const POST = async (context) => {
  const { request, redirect } = context;
  const supabase = createClient(context);
  const formData = await request.formData();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const username = formData.get("username")?.toString();
  const fullName = formData.get("fullName")?.toString();


  if (!email || !password || !username || !fullName) {
    return new Response("All fields are required", { status: 400 });
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
        full_name: fullName,
      },
    },
  });

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  // This will redirect the user to a page that tells them to check their email.
  // You should create this page.
  return redirect("/login?message=Check your email for a verification link.");
};