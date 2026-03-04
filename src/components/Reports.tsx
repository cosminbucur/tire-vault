import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

type Size = {
  size: string
  count: number
}

type BrandData = {
  brand: string
  sizes: Size[]
  count: string
}

const data: BrandData[] = [
  {
    brand: "Continental",
    sizes: [
      { size: "215 / 65 R17", count: 8 },
      { size: "215 / 65 R16", count: 6 },
      { size: "215 / 65 R15", count: 12 },
    ],
    count: "20",
  },
  {
    brand: "Pirelli",
    sizes: [
      { size: "215 / 65 R17", count: 4 },
      { size: "215 / 65 R16", count: 6 },
      { size: "215 / 65 R15", count: 8 },
    ],
    count: "12",
  },
  {
    brand: "Michelin",
    sizes: [
      { size: "215 / 65 R17", count: 4 },
      { size: "215 / 65 R16", count: 6 },
      { size: "215 / 65 R15", count: 8 },
    ],
    count: "12",
  },
  {
    brand: "Goodyear",
    sizes: [
      { size: "215 / 65 R17", count: 4 },
      { size: "215 / 65 R16", count: 6 },
      { size: "215 / 65 R15", count: 8 },
    ],
    count: "12",
  },
  {
    brand: "Bridgestone",
    sizes: [
      { size: "215 / 65 R17", count: 4 },
      { size: "215 / 65 R16", count: 6 },
      { size: "215 / 65 R15", count: 8 },
    ],
    count: "12",
  },
  {
    brand: "Hankook",
    sizes: [
      { size: "215 / 65 R17", count: 4 },
      { size: "215 / 65 R16", count: 6 },
      { size: "215 / 65 R15", count: 8 },
    ],
    count: "12",
  },
]

const tyresBySize = [
  { size: "215 / 65 R17", count: 4 },
  { size: "215 / 65 R16", count: 6 },
  { size: "215 / 65 R15", count: 8 },
]

const tyresByBrand = [
  { brand: "Continental", count: 8 },
  { brand: "Pirelli", count: 6 },
  { brand: "Michelin", count: 4 },
]

export default function TyresDashboard() {
  return (
    <div className="grid gap-6 p-6">
      {/* ========================= */}
      {/* Count by Brand & Size */}
      {/* ========================= */}
      <Card>
        <CardHeader>
          <CardTitle>Tyres by Brand and Size</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-3 gap-6">
          {data.map((brand) => (
            <div
              key={brand.brand}
              className="rounded-2xl border p-4 shadow-sm"
            >
              <h3 className="font-semibold text-lg mb-2">
                {brand.brand} ({brand.count})
              </h3>

              <div className="space-y-2">
                {brand.sizes.map((size) => (
                  <div
                    key={size.size}
                    className="flex justify-between text-sm"
                  >
                    <span>{size.size}</span>
                    <span className="font-medium">{size.count}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* ========================= */}
      {/* Chart by Brand */}
      {/* ========================= */}
      <Card>
        <CardHeader>
          <CardTitle>Number of Tyres by Brand</CardTitle>
        </CardHeader>
        <CardContent className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={tyresByBrand}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="brand" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* ========================= */}
      {/* Chart by Size */}
      {/* ========================= */}
      <Card>
        <CardHeader>
          <CardTitle>Number of Tyres by Size</CardTitle>
        </CardHeader>
        <CardContent className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={tyresBySize}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="size" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}