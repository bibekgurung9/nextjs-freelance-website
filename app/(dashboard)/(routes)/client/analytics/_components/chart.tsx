"use client";

import { Card } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

interface ChartProps{
  data: {
    name: string;
    total: number;
  }
}


export const Chart = ({ data }: ChartProps) => {
return(
  <Card>
    <ResponsiveContainer width="100%" height={350}>

    </ResponsiveContainer>
  </Card>
)
}