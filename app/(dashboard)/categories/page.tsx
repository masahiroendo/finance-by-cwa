"use client";

import { Ellipsis, Plus } from "lucide-react";

import { useNewCategory } from "@/features/categories/hooks/use-new-category";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { useBulkDeleteCategories } from "@/features/categories/api/use-bulk-delete-categories";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { columns } from "./columns";

const CategoriesPage = () => {
  const newCategory = useNewCategory();
  const deleteCategories = useBulkDeleteCategories();
  const categoriesQuery = useGetCategories();
  const categories = categoriesQuery.data || [];

  const isDisabled = categoriesQuery.isLoading || deleteCategories.isPending;

  if (categoriesQuery.isLoading) {
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadwow-sm">
          <CardHeader className="gap-y-2 md:flex-row md:items-center md:justify-between">
            <Skeleton className="h-9 w-36" />
            <Skeleton className="h-9 w-28" />
          </CardHeader>
          <CardContent>
            <div className=" h-[500px] w-full flex items-center justify-center">
              <Ellipsis className="size-6 text-slate-300 animate-ping" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadwow-sm">
        <CardHeader className="gap-y-2 md:flex-row md:items-center md:justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Categories Page
          </CardTitle>
          <Button size="sm" onClick={newCategory.onOpen}>
            <Plus className="size-4 mr-2" />
            Add new
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={categories}
            filterKey={"name"}
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);
              deleteCategories.mutate({ ids });
            }}
            disabled={isDisabled}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoriesPage;
