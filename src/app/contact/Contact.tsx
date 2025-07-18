"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { gql, useMutation } from "@apollo/client";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});
type FormData = z.infer<typeof schema>;

const SUBMIT_CONTACT = gql`
  mutation SubmitContact($input: SubmitContactInput!) {
    submitContact(input: $input)
  }
`;

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  const [submitContact, { data, error, loading }] = useMutation(SUBMIT_CONTACT);
  function onSubmit(data: FormData) {
    submitContact({
      variables: {
        input: {
          email: data.email,
          name: data.name,
          message: data.message,
        },
      },
    })
      .then(() => {
        reset();
      })
      .catch(() => {});
  }
  return (
    <div className="w-full max-w-md p-8 bg-[var(--background)] rounded shadow-lg flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-4">Contact</h2>
      <form
        className="flex flex-col gap-4 w-full"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
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
        <textarea
          placeholder="Message"
          className="px-4 py-2 rounded border border-gray-300 bg-transparent text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--foreground)] min-h-[100px]"
          {...register("message")}
        />
        {errors.message && (
          <div className="text-red-500 text-sm">{errors.message.message}</div>
        )}
        <button
          type="submit"
          className={`mt-2 px-6 py-2 rounded font-semibold shadow transition-colors ${
            isValid
              ? "bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--foreground)]/90"
              : "bg-gray-400 text-gray-700 cursor-not-allowed opacity-60"
          }`}
          disabled={!isValid || loading}
        >
          {loading ? "Sending..." : "Send"}
        </button>
        {data && <div className="text-green-600 mt-2">Message sent!</div>}
        {error && (
          <div className="text-red-600 mt-2">Error sending message.</div>
        )}
      </form>
    </div>
  );
}
