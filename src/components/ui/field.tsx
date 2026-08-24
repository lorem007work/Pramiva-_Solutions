import type {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

type FieldFrameProps = {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
};

const controlClasses =
  "mt-2 min-h-12 w-full rounded-xl border border-line-strong bg-canvas px-4 py-3 text-ink outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-ink-subtle focus:border-brand focus:ring-2 focus:ring-brand/20";

function FieldFrame({
  id,
  label,
  error,
  optional,
  children,
}: FieldFrameProps & { children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
        {optional ? (
          <span className="ml-2 font-normal text-ink-subtle">Optional</span>
        ) : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

type InputFieldProps = FieldFrameProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, "id">;

export function InputField({
  id,
  label,
  error,
  optional,
  className = "",
  ...inputProps
}: InputFieldProps) {
  return (
    <FieldFrame id={id} label={label} error={error} optional={optional}>
      <input
        id={id}
        className={`${controlClasses} ${className}`}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        {...inputProps}
      />
    </FieldFrame>
  );
}

type TextareaFieldProps = FieldFrameProps &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id">;

export function TextareaField({
  id,
  label,
  error,
  optional,
  className = "",
  ...textareaProps
}: TextareaFieldProps) {
  return (
    <FieldFrame id={id} label={label} error={error} optional={optional}>
      <textarea
        id={id}
        className={`${controlClasses} min-h-40 resize-y ${className}`}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        {...textareaProps}
      />
    </FieldFrame>
  );
}
