import { db } from "@/lib/db";
import { Job, Payment } from "@prisma/client";

type PaymentWithJob = Payment & {
  job: Job;
}

const groupbByJobs = (payments: PaymentWithJob[]) => {
  const grouped: { [jobTitle: string]: number } = {};

  payments.forEach((payment) => {
    const jobTitle = payment.job.title;
    if(!grouped[jobTitle]){
      grouped[jobTitle] = 0;
    }
    grouped[jobTitle] += payment.job.price!;
  });

  return grouped;
}

export const getAnalytics = async (userId: string) => {
  try{
    const payments = await db.payment.findMany({
      where: {
        job: {
          userId: userId,
        },
      },
      include: {
        job: true,
      }
    })

    const groupedPayments = groupbByJobs(payments);
    const data = Object.entries(groupedPayments).map(([jobTitle, total]) => (
      {
        name: jobTitle,
        total: total,
      }));
      
      const totalRevenue = data.reduce((acc, curr) => acc + curr.total, 0);
      const totalSales = payments.length;

      return {
        data, 
        totalRevenue,
        totalSales,
      }

  } catch(error){
    console.log("[GET_ANALYTICS]", error);
    return{
      data: [],
      totalRevenue: [],
      totalSales: [],
    }
  }
}