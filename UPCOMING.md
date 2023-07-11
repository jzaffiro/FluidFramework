<!-- THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY. -->

# Upcoming changes in Fluid Framework v2.0.0-internal.5.3.0

## IDeltaManager members disposed and dispose() deprecated

Directly calling dispose() on the IDeltaManager puts the system in an inconsistent state, and inspecting the disposed state of the IDeltaManager is not recommended (instead, prefer to inspect either the IContainer.disposed, IContainerRuntime.disposed, or IFluidDataStoreRuntime.disposed depending on your scenario). These members have been deprecated from the interface and will be removed in an upcoming release.

## Move closeAndGetPendingLocalState to IContainerExperimental

This change deprecates the experimental method closeAndGetPendingLocalState on IContainer and moves it to IContainerExperimental. IContainerExperimental is an interface that is easily casted to, which enables partners to access experimental features for testing and evaluation. Moving the experimental method off IContainer will reduce exposure and churn on that production interface as we iterate on and finalize our experimental features. Experimental features should not be used in production environments.