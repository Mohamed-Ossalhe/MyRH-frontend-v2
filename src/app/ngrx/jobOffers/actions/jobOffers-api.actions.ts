import { JobOffer } from "@app/core/models/job-offer";
import { createActionGroup, props } from "@ngrx/store";
import { PageInfo } from "../jobOffersState.interface";
import { ValidationErrorsInterface } from "@app/core/interfaces/validation-errors.interface";
import { BackendErrorsInterface } from "@app/core/interfaces/backend-errors.interface";

export const jobOffersApiActions = createActionGroup({
    source: "Job Offers Api",
    events: {
        jobOffersLoadedSuccess: props<{jobOffers: JobOffer[], pageInfo: PageInfo}>(),
        jobOffersLoadedFailure: props<{errors: {}}>(),
        jobOfferAddedSuccess: props<{jobOffer: JobOffer}>(),
        jobOfferAddedFailure: props<{errors: ValidationErrorsInterface, errorMessage: BackendErrorsInterface}>()
    }
})