import { API_GATEWAY } from "./environments/environment";

export const APPLICATION_NAME = {
    COVID_TRACKER: API_GATEWAY.SERVER + "/covid-tracker"
}

export const SERVICES = {
    DASHBOARD : APPLICATION_NAME.COVID_TRACKER + "/dashboard"
}


export const APP_CONFIG = {
    DASHBOARD_SERVICES : {
        GET_COVID_DATA: SERVICES.DASHBOARD + "/get-covid-data"
    }
}