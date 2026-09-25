import type { OrganismeId } from "../organismes";
import type { DispositifId } from "../dispositifs";
import type { ApplicationTemplate, ConnectorCapability } from "../applicationTemplate";
/**
 * Un connecteur par organisme. Toutes les m√©thodes ne sont pas obligatoirement disponibles ‚Äî
 * `capabilities` refl√®te l'√©tat r√©el de l'int√©gration, jamais une simulation (voir section 20).
 */
export interface FundingProviderConnector {
 organismeId: OrganismeId;
 capabilities: ConnectorCapability[];
 /** Retourne le template s'il existe pour ce dispositif, sinon null (aucun template invent√©). */
 getApplicationTemplate(dispositifId: DispositifId): ApplicationTemplate | null;
}
export function hasCapability(connector: FundingProviderConnector, capability: ConnectorCapability): boolean {
 return connector.capabilities.includes(capability);
}
