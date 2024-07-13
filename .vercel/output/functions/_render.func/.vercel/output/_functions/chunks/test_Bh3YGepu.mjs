const get = () => {
  return new Response(JSON.stringify({ message: "API is working" }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
};

export { get };
