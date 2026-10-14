import { getDish } from "@/db"

export async function GET(request, { params }) {
    const { id } = await params
    const dish = await getDish(id)
    if (!dish) {
        return Response.json(
            { error: 'Dish Not Found' },
            {
                status: 404
            })
    }
    return Response.json(dish)
}