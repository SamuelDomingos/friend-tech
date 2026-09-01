"use client"

import { useParams } from "next/navigation"

import { BillingRuleForm } from "../../_components/billing-rule-form"
import { billingRulesMock } from "../../_components/mock-data"

export default function EditarBillingRulePage() {
  const params = useParams<{ id: string }>()
  const rule = billingRulesMock.find((r) => r.id === params.id) ?? null

  return <BillingRuleForm rule={rule} />
}
