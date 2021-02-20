export default function TierValue(qtyUsers) {
  let tier = ""
  if(qtyUsers <= 50) tier = "Tier 1"
  if(qtyUsers >= 51 && qtyUsers <= 150) tier = "Tier 2"
  if(qtyUsers >= 151) tier = "Tier 3"
  return tier
}