"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";

import { cn } from "@/lib/utils";
import { submitLead } from "@/actions/lead";
import {
  contactFormSchema,
  serviceOptions,
  type ContactFormValues,
} from "@/lib/validations/lead";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { LeadSource } from "@/types";

interface LeadFormProps {
  source: LeadSource;
  /** Pre-selected service (e.g. on a service detail page). */
  defaultService?: string;
  /** Compact variant drops the company field (used in the popup). */
  variant?: "full" | "compact";
  /** Called after a successful submission (e.g. to close a dialog). */
  onSuccess?: () => void;
  className?: string;
  submitLabel?: string;
}

const fieldError = "mt-1.5 text-sm text-destructive";

export function LeadForm({
  source,
  defaultService,
  variant = "full",
  onSuccess,
  className,
  submitLabel = "Get Free Consultation",
}: LeadFormProps) {
  const { toast } = useToast();
  const isCompact = variant === "compact";

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      service: (defaultService as ContactFormValues["service"]) ?? undefined,
      message: "",
      source,
      website: "",
    },
  });

  const serviceValue = watch("service");

  async function onSubmit(values: ContactFormValues) {
    const result = await submitLead(values);

    if (result.success) {
      toast({
        variant: "success",
        title: "Enquiry sent",
        description: result.message,
      });
      reset({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: (defaultService as ContactFormValues["service"]) ?? undefined,
        message: "",
        source,
        website: "",
      });
      onSuccess?.();
      return;
    }

    if (result.fieldErrors) {
      for (const [key, messages] of Object.entries(result.fieldErrors)) {
        if (messages?.[0]) {
          setError(key as keyof ContactFormValues, {
            message: messages[0],
          });
        }
      }
    }

    toast({
      variant: "destructive",
      title: "Something went wrong",
      description: result.message,
    });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("relative space-y-6", className)}
      noValidate
    >
      {/* Honeypot — visually hidden, off the tab order. */}
      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={`website-${source}`}>Leave this field empty</label>
        <input
          id={`website-${source}`}
          type="text"
          suppressHydrationWarning
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor={`name-${source}`}>
            Full Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id={`name-${source}`}
            className="mt-1.5"
            autoComplete="name"
            placeholder="Jane Smith"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? `name-${source}-error` : undefined}
            {...register("name")}
          />
          {errors.name && (
            <p id={`name-${source}-error`} className={fieldError}>
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor={`email-${source}`}>
            Email <span className="text-destructive">*</span>
          </Label>
          <Input
            id={`email-${source}`}
            type="email"
            className="mt-1.5"
            autoComplete="email"
            placeholder="jane@company.com"
            aria-invalid={!!errors.email}
            aria-describedby={
              errors.email ? `email-${source}-error` : undefined
            }
            {...register("email")}
          />
          {errors.email && (
            <p id={`email-${source}-error`} className={fieldError}>
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div className={cn("grid gap-5", !isCompact && "sm:grid-cols-2")}>
        <div>
          <Label htmlFor={`phone-${source}`}>
            Phone <span className="text-destructive">*</span>
          </Label>
          <Input
            id={`phone-${source}`}
            type="tel"
            className="mt-1.5"
            autoComplete="tel"
            placeholder="+44 7000 000000"
            aria-invalid={!!errors.phone}
            aria-describedby={
              errors.phone ? `phone-${source}-error` : undefined
            }
            {...register("phone")}
          />
          {errors.phone && (
            <p id={`phone-${source}-error`} className={fieldError}>
              {errors.phone.message}
            </p>
          )}
        </div>

        {!isCompact && (
          <div>
            <Label htmlFor={`company-${source}`}>Company</Label>
            <Input
              id={`company-${source}`}
              className="mt-1.5"
              autoComplete="organization"
              placeholder="Company name (optional)"
              {...register("company")}
            />
          </div>
        )}
      </div>

      <div>
        <Label htmlFor={`service-${source}`}>
          Service Required <span className="text-destructive">*</span>
        </Label>
        <Select
          value={serviceValue}
          onValueChange={(value) =>
            setValue("service", value as ContactFormValues["service"], {
              shouldValidate: true,
            })
          }
        >
          <SelectTrigger
            id={`service-${source}`}
            className="mt-1.5"
            aria-invalid={!!errors.service}
          >
            <SelectValue placeholder="Select a service" />
          </SelectTrigger>
          <SelectContent>
            {serviceOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.service && <p className={fieldError}>{errors.service.message}</p>}
      </div>

      <div>
        <Label htmlFor={`message-${source}`}>
          {isCompact ? "Message (optional)" : "Message"}
        </Label>
        <Textarea
          id={`message-${source}`}
          className="mt-1.5"
          rows={isCompact ? 3 : 5}
          placeholder="Tell us a little about your project or requirements."
          {...register("message")}
        />
        {errors.message && (
          <p className={fieldError}>{errors.message.message}</p>
        )}
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            <Send aria-hidden="true" />
            {submitLabel}
          </>
        )}
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        By submitting, you agree to be contacted about your enquiry. We respect
        your privacy.
      </p>
    </form>
  );
}
