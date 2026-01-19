
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { truckService, Truck, TruckDetails } from "@/services/truck.service";


// export const truckKeys = {
//   all: ["trucks"] as const,
//   list: () => [...truckKeys.all, "list"] as const,
//   detail: (id: string) => [...truckKeys.all, "detail", id] as const,
// };

// /* =========================
//    GET ALL TRUCKS
//    ========================= */
// export function useTrucks() {
//   const query = useQuery({
//     queryKey: truckKeys.list(),
//     queryFn: truckService.getTrucks,
//     staleTime: 5 * 60 * 1000,
//   });

//   return {
//     trucks: query.data ?? [],
//     loading: query.isLoading,
//     error: query.error ? "Failed to load trucks" : null,
//     refetch: query.refetch,
//   };
// }

// /* =========================
//    GET SINGLE TRUCK (DETAILS)
//    ========================= */
// export function useTruck(id: string | null) {
//   const query = useQuery({
//     queryKey: truckKeys.detail(id || ""),
//     queryFn: () => truckService.getTruckById(id!),
//     enabled: !!id,
//   });

//   return {
//     truck: query.data as TruckDetails | null,
//     loading: query.isLoading,
//     error: query.error ? "Failed to load truck details" : null,
//   };
// }

// /* =========================
//    CREATE TRUCK
//    ========================= */
// export function useCreateTruck() {
//   const qc = useQueryClient();

//   return useMutation({
//     mutationFn: truckService.createTruck,
//     onSuccess: () => {
//       qc.invalidateQueries({ queryKey: truckKeys.list() });
//     },
//   });
// }

// /* =========================
//    UPDATE TRUCK
//    ========================= */
// export function useUpdateTruck() {
//   const qc = useQueryClient();

//   return useMutation({
//     mutationFn: ({ id, payload }: { id: string; payload: any }) =>
//       truckService.updateTruck(id, payload),
//     onSuccess: (_, vars) => {
//       qc.invalidateQueries({ queryKey: truckKeys.detail(vars.id) });
//       qc.invalidateQueries({ queryKey: truckKeys.list() });
//     },
//   });
// }

// /* =========================
//    DELETE TRUCK
//    ========================= */
// export function useDeleteTruck() {
//   const qc = useQueryClient();

//   return useMutation({
//     mutationFn: truckService.deleteTruck,
//     onSuccess: () => {
//       qc.invalidateQueries({ queryKey: truckKeys.list() });
//     },
//   });
// }

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { truckService, Truck } from "@/services/truck.service";

export const truckKeys = {
  all: ["trucks"] as const,
  list: () => [...truckKeys.all, "list"] as const,
  detail: (id: string) => [...truckKeys.all, "detail", id] as const,
};

export function useTrucks() {
  const query = useQuery<Truck[]>({
    queryKey: truckKeys.list(),
    queryFn: truckService.getTrucks,
    staleTime: 10 * 60 * 1000, // Instant loading from cache for 10 mins
    refetchOnWindowFocus: false,
    refetchOnMount: false, // Prevents sidebar clicks from hitting API
  });
  return { trucks: query.data ?? [], loading: query.isLoading };
}

export function useCreateTruck() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: truckService.createTruck,
    onSuccess: () => qc.invalidateQueries({ queryKey: truckKeys.list() }),
  });
}

export function useUpdateTruck() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<Truck> }) =>
      truckService.updateTruck(id, payload),
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: truckKeys.list() });
      qc.invalidateQueries({ queryKey: truckKeys.detail(vars.id) });
    },
  });
}

export function useDeleteTruck() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: truckService.deleteTruck,
    onSuccess: () => qc.invalidateQueries({ queryKey: truckKeys.list() }),
  });
}