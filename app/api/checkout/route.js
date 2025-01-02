import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { items } = await req.json();

    // تحويل المنتجات إلى صيغة Stripe
    const transformedItems = items.map((item) => {
      const product = item.products[0]; // المنتج الأول
      const imageUrl = product.image?.[0]?.url; // أول رابط صورة
      const price = Math.round(product.price * 100); // السعر

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            images: [imageUrl],
          },
          unit_amount: price,
        },
        quantity: item.quantity,
      };
    });

    // إضافة عملية التحقق هنا
    if (transformedItems.length === 0) {
      return new Response(
        JSON.stringify({ error: "No items found to checkout" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // إنشاء جلسة دفع
    // api/checkout.js أو مكان API آخر
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: transformedItems,
      mode: "payment",
      success_url: `${req.headers.get("origin")}/success`, // سيتم التوجيه هنا عند النجاح
      cancel_url: `${req.headers.get("origin")}/error`, // سيتم التوجيه هنا عند الفشل
    });

    return new Response(JSON.stringify({ id: session.id }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
