"use client"
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast";
import { setCookie } from "cookies-next";
import Head from "next/head";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const phonenum = formData.get("phonenum");
    const password = formData.get("password");

    fetch( process.env.NEXT_PUBLIC_BACKEND_URL + "auth/login" as string, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phonenum, password }),
      })
      .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to log in");
      }
      return response.json();
    })
    .then((data) => {
      setCookie("access-token", data.access_token);
      setCookie("token_type", data.token_type);
      router.push("/");
    })
    .catch((error) => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
    });
  }
  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Sign In
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="phonenum"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Phone Number
              </label>
              <input
                name="phonenum"
                pattern="[0-9]{10}"
                id="phonenum"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                placeholder="Enter your phone number"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                name="password"
                type="password"
                id="password"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Sign In
            </button>
          </form>
          <p className="text-sm text-center text-gray-600 mt-4">
            Don&apos;t have an account?{" "}
            <div
              onClick={() => router.push("/auth/register")}
              className="text-blue-500 hover:underline"
            >
              Sign Up
            </div>
          </p>
        </div>
      </div>
    </>
  );
  }
