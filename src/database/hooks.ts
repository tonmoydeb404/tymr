import { WorkTime } from "@/types/work-times";
import useSWR, { mutate } from "swr";
import useSWRMutation, { SWRMutationConfiguration } from "swr/mutation";
import {
  deleteWorkTime,
  endWorkTime,
  getActiveWorkTime,
  getWorkTimeReport,
  getWorkTimesByDate,
  startWorkTime,
  updateWorkTime,
} from "./services";

// ----------------------------------------------------------------------

export const useWorkTimesByDate = (date: string) => {
  return useSWR(["workTimesByDate", date], () => getWorkTimesByDate(date));
};

export const useActiveWorkTime = () => {
  return useSWR<WorkTime | null>("activeWorkTime", getActiveWorkTime);
};

export const useWorkTimeReport = (startDate: string, endDate: string) => {
  return useSWR(["workTimeReport", startDate, endDate], () =>
    getWorkTimeReport(startDate, endDate)
  );
};

// ----------------------------------------------------------------------

// Hook to start work time
export const useStartWorkTime = (
  options?: SWRMutationConfiguration<WorkTime, Error, any>
) => {
  return useSWRMutation(
    "startWorkTime", // Unique key for mutation
    async (_key, { arg }: { arg: Pick<WorkTime, "title"> }) => {
      // Perform the action (start work time)
      const entity = await startWorkTime(arg);
      return entity;
    },
    {
      ...options,
      // On success, mutate other data related to the mutation
      onSuccess: (data, ...args) => {
        // Trigger cache invalidation
        mutate(["workTimesByDate", data.date]);
        mutate("activeWorkTime");
        options?.onSuccess?.(data, ...args);
      },
    }
  );
};

// Hook to end work time
export const useEndWorkTime = (
  options?: SWRMutationConfiguration<WorkTime, Error, any>
) => {
  return useSWRMutation(
    "endWorkTime",
    async () => {
      const entity = await endWorkTime();
      return entity;
    },
    {
      ...options,
      onSuccess: (data, ...args) => {
        mutate(["workTimesByDate", data.date]);
        mutate("activeWorkTime");
        mutate("workTimeReport");
        options?.onSuccess?.(data, ...args);
      },
    }
  );
};

// Hook to update work time
export const useUpdateWorkTime = (
  options?: SWRMutationConfiguration<WorkTime, Error, any>
) => {
  return useSWRMutation(
    "updateWorkTime", // Unique key for mutation
    async (
      _key,
      { arg }: { arg: { id: string; updates: Partial<WorkTime> } }
    ) => {
      // Perform the action (update work time)
      const entity = await updateWorkTime(arg.id, arg.updates);
      return entity;
    },
    {
      ...options,
      // On success, mutate other data related to the mutation
      onSuccess: (data, ...args) => {
        mutate(["workTimesByDate", data.date]);
        mutate("workTimeReport");
        options?.onSuccess?.(data, ...args);
      },
    }
  );
};

// Hook to delete work time
export const useDeleteWorkTime = (
  options?: SWRMutationConfiguration<WorkTime, Error, any>
) => {
  return useSWRMutation(
    "deleteWorkTime", // Unique key for mutation
    async (_key, { arg }: { arg: string }) => {
      // Perform the action (delete work time)
      const entity = await deleteWorkTime(arg);
      return entity;
    },
    {
      ...options,
      // On success, mutate other data related to the mutation
      onSuccess: (data, ...args) => {
        mutate(["workTimesByDate", data.date]);
        mutate("workTimeReport");
        mutate("activeWorkTime");

        options?.onSuccess?.(data, ...args);
      },
    }
  );
};
