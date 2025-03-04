// app/api/subscribe/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
    const ADMIN_API_ACCESS_TOKEN = process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN;

    // Search for existing customer
    const searchRes = await fetch(
      `https://${SHOPIFY_STORE_DOMAIN}/admin/api/2022-10/customers/search.json?query=email:${email}`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": ADMIN_API_ACCESS_TOKEN!,
        },
      }
    );

    const searchData = await searchRes.json();
    let customerId;

    if (searchData.customers && searchData.customers.length > 0) {
      customerId = searchData.customers[0].id;
      const updateRes = await fetch(
        `https://${SHOPIFY_STORE_DOMAIN}/admin/api/2022-10/customers/${customerId}.json`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Access-Token": ADMIN_API_ACCESS_TOKEN!,
          },
          body: JSON.stringify({
            customer: { id: customerId, accepts_marketing: true },
          }),
        }
      );
      if (!updateRes.ok) {
        const updateError = await updateRes.text();
        console.error("Update error:", updateRes.status, updateError);
        return NextResponse.json({ error: updateError }, { status: updateRes.status });
      }
    } else {
      const createRes = await fetch(
        `https://${SHOPIFY_STORE_DOMAIN}/admin/api/2022-10/customers.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Access-Token": ADMIN_API_ACCESS_TOKEN!,
          },
          body: JSON.stringify({
            customer: { email, accepts_marketing: true },
          }),
        }
      );
      if (!createRes.ok) {
        const createError = await createRes.text();
        console.error("Create error:", createRes.status, createError);
        return NextResponse.json({ error: createError }, { status: createRes.status });
      }
      const createData = await createRes.json();
      customerId = createData.customer?.id;
    }

    return NextResponse.json({ success: true, customerId });
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
