import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Button } from "../../../components/ui/button";
import { Torder } from "../../../types/order";
import CartModal from "../../../components/modals/CartModal";
import { baseUrl } from "../../../constants/baseUrl";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  title?: string;
  orders: Torder[];
  pending_table?: boolean;
  completed_table?: boolean;
  cancelled_table?: boolean;
  readonly?: boolean;
  loading?: boolean;
};

function DownLoadReportButton() {
  return (
    <div className="">
      <div className="flex gap-x-2">
        <label htmlFor=""></label>
        <input
          className="w-40 rounded-md px-2 placeholder:text-center"
          title="date"
          placeholder=""
          type="date"
        />
        <Button className="bg-white text-black">Download</Button>
      </div>
    </div>
  );
}

function OrderUpdateButton({
  _id,
  waiting,
  pending,
}: {
  pending: boolean;
  waiting: boolean;
  _id: string;
}) {
  const readyForPickup = async () => {
    try {
      const affiliate_id = localStorage.getItem("_id");
      const res = await fetch(`${baseUrl}/orders/ready-for-pickup`, {
        method: "POST",
        body: JSON.stringify({ order_id: _id, affiliate_id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const queryClient = useQueryClient();
  const { mutate: handleReadyForPickup, isLoading } = useMutation(
    readyForPickup,
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["affiliate_pending_orders"],
        });
        toast({
          title: "Order ready for pickup",
          description:
            "Order has been marked for pickup a driver will be with you shortly",
        });
      },
    }
  );

  return (
    <TableCell className="flex items-center justify-center border-x  text-white ">
      {!isLoading && pending && (
        <button
          onClick={() => handleReadyForPickup()}
          className="group group rounded-lg transition-all duration-300  ease-in  "
        >
          <span className="text-xs font-medium text-blue-400 group-hover:text-green-400  ">
            Ready order for pickup
          </span>
        </button>
      )}
      {!isLoading && waiting && (
        <span className="text-xs font-medium text-blue-400 ">
          Waiting for pickup
        </span>
      )}
      {isLoading && (
        <span className="text-xs font-medium text-blue-400 animate-pulse ">
          Readying for pickup...
        </span>
      )}
    </TableCell>
  );
}

const OrdersLoadingSkeleton = () => {
  return (
    <div className="flex flex-col py-6 space-y-3 max-w-5xl mx-auto">
      <div className="space-y-2 flex w-full justify-between items-center">
        <Skeleton className="h-8 w-[250px] " />
        <div className="flex gap-x-2">
          <Skeleton className="h-8 w-[100px]" />
          <Skeleton className="h-8 w-[150px]" />
        </div>
      </div>
      <div className="flex pt-4  justify-between">
        <Skeleton className="h-8 w-[100px]" />
        <Skeleton className="h-8 w-[100px]" />
        <Skeleton className="h-8 w-[100px]" />
        <Skeleton className="h-8 w-[100px]" />
        <Skeleton className="h-8 w-[100px]" />
      </div>
      <Skeleton className="h-[45px] w-full " />
      <Skeleton className="h-[45px] w-full " />
      <Skeleton className="h-[45px] w-full " />
      <Skeleton className="h-[45px] w-full " />
    </div>
  );
};

function AffiliateOrderTable({
  orders,
  pending_table,
  readonly,
  completed_table,
  loading,
}: Props) {
  if (loading) {
    return <OrdersLoadingSkeleton />;
  }

  return (
    <div className="py-6 md:space-y-6">
      <div className="flex items-center justify-end px-2">
        <DownLoadReportButton />
      </div>
      <Table>
        {orders && orders.length == 0 && (
          <TableCaption>No orders to display</TableCaption>
        )}
        <TableHeader>
          <TableRow>
            <TableHead className="text-center text-white">Status</TableHead>
            <TableHead className=" text-center text-white">Cart</TableHead>
            <TableHead className=" text-center text-white">
              Order Note
            </TableHead>
            <TableHead className=" text-center text-white">Total</TableHead>
            <TableHead className=" text-center text-white">Date</TableHead>
          </TableRow>
        </TableHeader>
        {orders && orders.length > 0 && (
          <TableBody className="">
            {orders?.map((order: Torder) => {
              const { status, total, _createdAt, _id } = order;
              const { waiting, pending } = status;
              const date = new Date(_createdAt).toLocaleDateString();
              return (
                <TableRow key={order._id}>
                  {/* STATUS */}
                  {pending_table && (
                    <OrderUpdateButton
                      pending={pending}
                      _id={_id}
                      waiting={waiting}
                    />
                  )}
                  {readonly && (
                    <TableCell className="w-[200px] border-x text-center font-medium text-white">
                      {status.waiting && "Waiting for pickup"}
                      {status.pending && "Pending"}
                      {status.completed && "Completed"}
                      {status.cancelled && "Cancelled"}
                    </TableCell>
                  )}
                  {completed_table && (
                    <TableCell className="w-[200px] border-x text-center font-medium text-white">
                      Completed
                    </TableCell>
                  )}
                  {/* CART */}
                  <CartModal cart={order?.products} />
                  {/* Note */}
                  <TableCell className=" w-1/5 max-w-sm  cursor-pointer border-x text-white hover:bg-blue-200 hover:text-blue-600 ">
                    <p className="text-center font-medium text-gray-500 ">
                      {order.note ? "View Note" : "None"}
                    </p>
                  </TableCell>
                  <TableCell className="border-x text-center text-white ">
                    ${total}
                  </TableCell>
                  <TableCell className="w-[200px] border-x text-center font-medium text-white">
                    {date}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        )}
      </Table>
    </div>
  );
}

export default AffiliateOrderTable;
