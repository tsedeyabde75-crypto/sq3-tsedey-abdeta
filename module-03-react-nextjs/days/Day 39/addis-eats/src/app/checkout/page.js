import CheckoutForm from "./CheckoutForm";

export default function CheckoutPage() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-slate-900 dark:text-white">
        Checkout
      </h1>
      <CheckoutForm />
    </main>
  );
}