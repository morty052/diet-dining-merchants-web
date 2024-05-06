import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { categoryProps } from "..";

type Props = {
  categories: categoryProps[] | [];
};

function CategoryTable({ categories }: Props) {
  return (
    <div className="py-6 md:space-y-6">
      <Table>
        {categories && categories.length == 0 && (
          <TableCaption>No orders to display</TableCaption>
        )}
        <TableHeader>
          <TableRow>
            <TableHead className="text-center text-white">Name</TableHead>
            <TableHead className=" text-center text-white">Menus</TableHead>
            <TableHead className=" text-center text-white">Items</TableHead>
          </TableRow>
        </TableHeader>
        {categories && categories.length > 0 && (
          <TableBody className="">
            {categories?.map((category) => {
              const { title, products, menus } = category;
              return (
                <TableRow key={title}>
                  {/* Note */}
                  <TableCell className=" cursor-pointer border-x text-white hover:bg-blue-200 hover:text-blue-600 ">
                    <p className="text-center font-medium text-light ">
                      {title}
                    </p>
                  </TableCell>
                  <TableCell className="border-x text-center text-white ">
                    <div className="flex gap-x-1 justify-center">
                      {menus.map((menu, index) => (
                        <span>
                          {menu}
                          {index !== menus.length - 1 && ","}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="border-x text-center font-medium text-white">
                    {products?.length} items
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

export default CategoryTable;
