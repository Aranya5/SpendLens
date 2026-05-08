import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuditFormData, ToolId, UseCase } from "./types";
import { TOOLS } from "./tools-config";

function buildDefaultTools(): AuditFormData["tools"] {
  return Object.fromEntries(
    TOOLS.map((tool) => [
      tool.id,
      {
        id: tool.id as ToolId,
        enabled: false,
        plan: tool.plans[0],
        monthlySpend: "",
        seats: "1",
      },
    ])
  ) as AuditFormData["tools"];
}

const DEFAULT_FORM: AuditFormData = {
  tools: buildDefaultTools(),
  teamSize: "",
  useCase: "mixed",
};

interface AuditStore {
  formData: AuditFormData;
  setToolEnabled: (toolId: ToolId, enabled: boolean) => void;
  setToolPlan: (toolId: ToolId, plan: string) => void;
  setToolSpend: (toolId: ToolId, spend: string) => void;
  setToolSeats: (toolId: ToolId, seats: string) => void;
  setTeamSize: (size: string) => void;
  setUseCase: (useCase: UseCase) => void;
  resetForm: () => void;
}

export const useAuditStore = create<AuditStore>()(
  persist(
    (set) => ({
      formData: DEFAULT_FORM,

      setToolEnabled: (toolId, enabled) =>
        set((s) => ({
          formData: {
            ...s.formData,
            tools: {
              ...s.formData.tools,
              [toolId]: { ...s.formData.tools[toolId], enabled },
            },
          },
        })),

      setToolPlan: (toolId, plan) =>
        set((s) => ({
          formData: {
            ...s.formData,
            tools: {
              ...s.formData.tools,
              [toolId]: { ...s.formData.tools[toolId], plan },
            },
          },
        })),

      setToolSpend: (toolId, monthlySpend) =>
        set((s) => ({
          formData: {
            ...s.formData,
            tools: {
              ...s.formData.tools,
              [toolId]: { ...s.formData.tools[toolId], monthlySpend },
            },
          },
        })),

      setToolSeats: (toolId, seats) =>
        set((s) => ({
          formData: {
            ...s.formData,
            tools: {
              ...s.formData.tools,
              [toolId]: { ...s.formData.tools[toolId], seats },
            },
          },
        })),

      setTeamSize: (teamSize) =>
        set((s) => ({ formData: { ...s.formData, teamSize } })),

      setUseCase: (useCase) =>
        set((s) => ({ formData: { ...s.formData, useCase } })),

      resetForm: () => set({ formData: DEFAULT_FORM }),
    }),
    {
      name: "spendlens-form-v1",
    }
  )
);