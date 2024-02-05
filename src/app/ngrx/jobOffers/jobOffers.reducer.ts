import { createFeature, createReducer, createSelector, on } from "@ngrx/store";
import { JobOffersState } from "./jobOffersState.interface";
import { jobOffersPageActions } from "./actions/jobOffers-page.actions";
import { jobOffersApiActions } from "./actions/jobOffers-api.actions";
import { selectUser } from "../auth/auth.reducer";

const initialState: JobOffersState = {
    collection: [],
    selectedJob: null,
    loading: false,
    errors: {},
    pageInfo: {
        currentPage: 0,
        first: false,
        last: false,
        totalElements: 0,
        totalPages: 0
    }
}

const jobOffersFeature = createFeature({
    name: "jobOffers",
    reducer: createReducer(
        initialState,
        on(jobOffersPageActions.enter, state => ({
            ...state,
            loading: true
        })),
        on(jobOffersPageActions.selectJob, (state, action) => ({
            ...state,
            loading: false,
            selectedJob: action.jobOffer
        })),
        on(jobOffersApiActions.jobOffersLoadedSuccess, (state, action) => ({
            ...state,
            loading: false,
            collection: action.jobOffers,
            pageInfo: action.pageInfo
        })),
        on(jobOffersApiActions.jobOffersLoadedFailure, (state, action) => ({
            ...state,
            loading: false,
            collection: [],
            errors: action.errors
        })),
        on(jobOffersPageActions.addJobOffer, (state, action) => ({
            ...state,
            loading: true
        })),
        on(jobOffersApiActions.jobOfferAddedSuccess, (state, action) => ({
            ...state,
            loading: false,
            collection: [...state.collection, action.jobOffer]
        })),
        on(jobOffersApiActions.jobOfferAddedFailure, (state, action) => ({
            ...state,
            loading: false,
            errors: action.errors,
        }))
    )
})

export const {
    name: jobOffersFeatureKey,
    reducer: jobOffersReducer,
    selectCollection,
    selectErrors,
    selectLoading,
    selectSelectedJob,
    selectPageInfo
} = jobOffersFeature;
