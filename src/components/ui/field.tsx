import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

type FieldFrameProps = {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
};

const controlClasses =
  "mt-2 min-h-12 w-full rounded-xl border bg-canvas px-4 py-3 text-ink transition-[border-color] duration-150 placeholder:text-ink-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus)]";

const stateClasses = (error?: string) =>
  error ? "border-error" : "border-line-strong focus:border-brand";

function ErrorIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="mt-0.5 size-4 shrink-0"
      fill="currentColor"
    >
      <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1Zm0 3.25c.41 0 .75.34.75.75v3.5a.75.75 0 0 1-1.5 0V5c0-.41.34-.75.75-.75Zm0 6a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8Z" />
    </svg>
  );
}

function FieldFrame({
  id,
  label,
  error,
  hint,
  optional,
  children,
}: FieldFrameProps & { children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
        {optional ? (
          <>
            {" "}
            <span className="ml-2 font-normal text-ink-subtle">Optional</span>
          </>
        ) : null}
      </label>
      {children}
      {hint && !error ? (
        <p id={`${id}-hint`} className="mt-2 text-sm text-ink-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p
          id={`${id}-error`}
          className="mt-2 flex gap-2 text-sm text-error"
        >
          <ErrorIcon />
          <span>{error}</span>
        </p>
      ) : null}
    </div>
  );
}

function describedBy(id: string, error?: string, hint?: string) {
  if (error) return `${id}-error`;
  if (hint) return `${id}-hint`;
  return undefined;
}

type InputFieldProps = FieldFrameProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, "id">;

export function InputField({
  id,
  label,
  error,
  hint,
  optional,
  className = "",
  ...inputProps
}: InputFieldProps) {
  return (
    <FieldFrame id={id} label={label} error={error} hint={hint} optional={optional}>
      <input
        id={id}
        className={`${controlClasses} ${stateClasses(error)} ${className}`}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy(id, error, hint)}
        {...inputProps}
      />
    </FieldFrame>
  );
}

type SelectFieldProps = FieldFrameProps &
  Omit<SelectHTMLAttributes<HTMLSelectElement>, "id"> & {
    options: ReadonlyArray<string>;
    /** Shown as the empty first choice. The field is optional, so it must exist. */
    placeholder: string;
  };

/**
 * A native `<select>`.
 *
 * Deliberately not a custom listbox. A styled div-based dropdown means
 * rebuilding keyboard interaction, typeahead, screen-reader semantics and the
 * mobile picker that iOS and Android already provide — several hundred lines
 * and a client component, to change the appearance of a control most visitors
 * will use once. The native element gets all of that for free and opens as the
 * platform's own wheel on a phone.
 */
export function SelectField({
  id,
  label,
  error,
  hint,
  optional,
  options,
  placeholder,
  className = "",
  ...selectProps
}: SelectFieldProps) {
  return (
    <FieldFrame id={id} label={label} error={error} hint={hint} optional={optional}>
      <select
        id={id}
        defaultValue=""
        /* `field-select` carries the chevron. It lives in globals.css because a
           data URI cannot read a CSS variable, so its stroke has to be a
           literal colour — and a literal colour is not allowed in a component. */
        className={`${controlClasses} ${stateClasses(error)} field-select pr-11 ${className}`}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy(id, error, hint)}
        {...selectProps}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </FieldFrame>
  );
}

type TextareaFieldProps = FieldFrameProps &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id">;

export function TextareaField({
  id,
  label,
  error,
  hint,
  optional,
  className = "",
  ...textareaProps
}: TextareaFieldProps) {
  return (
    <FieldFrame id={id} label={label} error={error} hint={hint} optional={optional}>
      <textarea
        id={id}
        className={`${controlClasses} ${stateClasses(error)} min-h-40 resize-y ${className}`}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy(id, error, hint)}
        {...textareaProps}
      />
    </FieldFrame>
  );
}
