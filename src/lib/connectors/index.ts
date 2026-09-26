import type { OrganismeId } from "../organismes";
import type { FundingProviderConnector } from "./types";
import { cnmConnector } from "./cnmConnector";
import { sacemConnector } from "./sacemConnector";
export type { FundingProviderConnector } from "./types";
export type { ConnectorCapability } from "../applicationTemplate";
export { hasCapability } from "./types";
/** Aucune capability : tant qu'aucun connecteur r√©el n'existe, ne jamais en simuler un (section 20). */
function fallbackConnector(organismeId: OrganismeId): FundingProviderConnector {
 return {
 organismeId,
 capabilities: [],
 getApplicationTemplate: () => null,
 };
}
const CONNECTORS: Partial<Record<OrganismeId, FundingProviderConnector>> = {
 CNM: cnmConnector,
 SACEM: sacemConnector,
};
export function getConnector(organismeId: OrganismeId): FundingProviderConnector {
 return CONNECTORS[organismeId] ?? fallbackConnector(organismeId);
}
