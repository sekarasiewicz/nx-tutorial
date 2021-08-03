start:
	yarn nx run-many --target=serve --projects=api,store --parallel=true

start2:
	yarn nx run store:serveAppAndApi

dep:
	yarn nx dep-graph
