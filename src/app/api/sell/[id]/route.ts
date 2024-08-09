import db from "../../../../../db/db";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
    const id = params.id
    console.log(id)
  const data = await db.customer.findUnique({where: {nid: id}})
  console.log(data)
  return Response.json(data)
}
