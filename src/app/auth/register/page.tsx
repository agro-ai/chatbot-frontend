"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { setCookie } from "cookies-next";
import Head from "next/head";

export default function SignUpPage() {
  const router = useRouter();
  const { toast } = useToast();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const phonenum = formData.get("phonenum");
    const address = formData.get("address");
    const fullName = formData.get("fullName");
    const password = formData.get("password");
    const photo = formData.get("photo");

    const payload = {
      fullName,
      phonenum,
      address,
      password,
      photo,
    };

    fetch((process.env.NEXT_PUBLIC_BACKEND_URL + "auth/login") as string, {
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
        });
      });
  }

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 text-black">
        <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Register
          </h1>
          <form onSubmit={handleSubmit}>
            {/* full name */}
            <div className="mb-4">
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Full Name
              </label>
              <input
                required
                name="fullName"
                type="text"
                id="fullName"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your full name"
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

            <div className="mb-4">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Address
              </label>
              <input
                id="address"
                name="address"
                className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Your Address"
                required
              ></input>
            </div>

            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number
              </label>
              <input
                id="phonenum"
                name="phonenum"
                className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Your Phone Number"
                pattern="[0-9]{10}"
                title="Enter a valid 10-digit phone number"
                required
              ></input>
            </div>
            <div className="mb-6">
              <label
                htmlFor="photo"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Upload Profile Photo
              </label>
              <input
                type="file"
                id="photo"
                name="photo"
                accept="image/*"
                className="block w-full text-sm text-gray-500 border rounded-lg shadow-sm cursor-pointer focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
              <p className="mt-2 text-sm text-gray-500">
                Accepted formats: JPG, PNG
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
