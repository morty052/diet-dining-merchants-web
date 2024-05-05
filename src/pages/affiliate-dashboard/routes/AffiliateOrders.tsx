import AffiliateOrderTable from "../components/AffiliateOrderTable";
import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "../../../constants/baseUrl";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const OrdersLoadingSkeleton = () => {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[20px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AffiliatePendingOrdersView = () => {
  async function fetchOrders() {
    const _id = localStorage.getItem("_id");

    const res = await fetch(
      `${baseUrl}/affiliates/get-affiliate-pending-orders?afilliate_id=${_id}`
    );
    const data = await res.json();
    console.log(data);
    return data;
  }
  const { isLoading, data: orders } = useQuery({
    queryKey: ["affiliate_pending_orders"],
    queryFn: fetchOrders,
  });

  return (
    <AffiliateOrderTable
      loading={isLoading}
      pending_table
      title="Pending Orders"
      orders={orders}
    />
  );
};

const AffiliateAllOrdersView = () => {
  async function fetchOrders() {
    const _id = localStorage.getItem("affiliate_id");

    const res = await fetch(
      `${baseUrl}/affiliates/get-affiliate-orders?afilliate_id=${_id}`
    );
    const data = await res.json();
    console.log(data);
    return data;
  }
  const { isLoading, data: orders } = useQuery({
    queryKey: ["all_affiliate_orders"],
    queryFn: fetchOrders,
  });

  if (isLoading) {
    return <OrdersLoadingSkeleton />;
  }
  return <AffiliateOrderTable readonly title="All Orders" orders={orders} />;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AffiliateCompletedOrdersView = () => {
  async function fetchOrders() {
    const _id = localStorage.getItem("_id");

    const res = await fetch(
      `${baseUrl}/affiliates/get-affiliate-completed-orders?afilliate_id=${_id}`
    );
    const data = await res.json();
    console.log(data);
    return data;
  }
  const { isLoading, data: orders } = useQuery({
    queryKey: ["affiliate_completed_orders"],
    queryFn: fetchOrders,
  });

  if (isLoading) {
    return null;
  }
  return (
    <AffiliateOrderTable readonly title="Completed Orders" orders={orders} />
  );
};

function AffiliateOrders() {
  return (
    <div className="w-full p-4">
      <Tabs defaultValue="overview" className="">
        <TabsList>
          <TabsTrigger className="w-[100px]" value="overview">
            Completed
          </TabsTrigger>
          <TabsTrigger className="w-[100px]" value="edit">
            Pending
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <AffiliateAllOrdersView />
        </TabsContent>
        <TabsContent value="edit">
          <AffiliateAllOrdersView />
        </TabsContent>
      </Tabs>
      {/* <Routes>
        <Route path="/" element={<AffiliateAllOrdersView />} />
        <Route path="/pending" element={<AffiliatePendingOrdersView />} />
        <Route path="/completed" element={<AffiliateCompletedOrdersView />} />
      </Routes> */}
    </div>
  );
}

export default AffiliateOrders;
