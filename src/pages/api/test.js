export async function get() {
    return new Response(JSON.stringify({ message: "Test API Route is working" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }