"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FeatureFlags from "../FeatureFlags";
import { notFound } from "next/navigation";

export default function IdeasPage() {
  const schema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    name: z.string().min(1, "Name is required"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  function onSubmit(data: FormData) {
    console.log(data);
    // TODO: Handle idea submission logic here
    reset();
  }

  if (!FeatureFlags.ideas) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-8">
      <div className="w-full max-w-md p-8 bg-[var(--background)] rounded shadow-lg flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4">Submit an Idea</h1>
        <form
          className="flex flex-col gap-4 w-full"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <input
            type="text"
            placeholder="Title"
            className="px-4 py-2 rounded border border-gray-300 bg-transparent text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--foreground)]"
            {...register("title")}
          />
          {errors.title && (
            <div className="text-red-500 text-sm">{errors.title.message}</div>
          )}
          <textarea
            placeholder="Description"
            className="px-4 py-2 rounded border border-gray-300 bg-transparent text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--foreground)] min-h-[100px]"
            {...register("description")}
          />
          {errors.description && (
            <div className="text-red-500 text-sm">
              {errors.description.message}
            </div>
          )}
          <input
            type="text"
            placeholder="Name"
            className="px-4 py-2 rounded border border-gray-300 bg-transparent text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--foreground)]"
            {...register("name")}
          />
          {errors.name && (
            <div className="text-red-500 text-sm">{errors.name.message}</div>
          )}
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-2 rounded border border-gray-300 bg-transparent text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--foreground)]"
            {...register("email")}
          />
          {errors.email && (
            <div className="text-red-500 text-sm">{errors.email.message}</div>
          )}
          <button
            type="submit"
            className={`mt-2 px-6 py-2 rounded font-semibold shadow transition-colors ${
              isValid
                ? "bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--foreground)]/90"
                : "bg-gray-400 text-gray-700 cursor-not-allowed opacity-60"
            }`}
            disabled={!isValid}
          >
            Submit Idea
          </button>
        </form>
      </div>
    </div>
  );
}
