import type {
  InputHTMLAttributes,
  SelectHTMLAttributes,
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
          <>
            {" "}
            <span className="ml-2 font-normal text-ink-subtle">Optional</span>
          </>
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
 *
 * The arrow is a background SVG rather than a wrapper element so the control
 * keeps its full clickable area, and `appearance-none` only removes the
 * default marker, not the behaviour.
 */
export function SelectField({
  id,
  label,
  error,
  optional,
  options,
  placeholder,
  className = "",
  ...selectProps
}: SelectFieldProps) {
  return (
    <FieldFrame id={id} label={label} error={error} optional={optional}>
      <select
        id={id}
        defaultValue=""
        /* `field-select` carries the chevron. It lives in globals.css because a
           data URI cannot read a CSS variable, so its stroke has to be a
           literal colour — and a literal colour is not allowed in a component. */
        className={`${controlClasses} field-select pr-11 ${className}`}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
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
