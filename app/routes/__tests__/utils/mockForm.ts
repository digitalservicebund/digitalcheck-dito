import { vi } from "vitest";

export const mockForm = () => {
  vi.mock("@rvf/react-router", async (importOriginal) => {
    const actual = await importOriginal<typeof import("@rvf/react-router")>();
    return {
      ...actual,
      useForm: vi.fn(() => ({
        getFormProps: () => ({
          id: "test-form",
          onSubmit: vi.fn(),
        }),
        scope: (name: string) => ({
          name,
          value: "",
          onChange: vi.fn(),
        }),
        dirty: () => false,
        touched: () => false,
        resetForm: vi.fn(),
        setDirty: vi.fn(),
        setTouched: vi.fn(),
        validate: vi.fn(),
        subscribe: {
          value: vi.fn(() => vi.fn()),
        },
      })),
      useField: vi.fn(() => ({
        getInputProps: (props: Record<string, unknown>) => ({
          ...props,
          name: "foobar",
          value: "",
          onChange: vi.fn(),
        }),
        error: () => null,
      })),
    };
  });
};
