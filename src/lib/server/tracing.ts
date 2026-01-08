import { resourceFromAttributes } from '@opentelemetry/resources';
import { NodeTracerProvider, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { OpenAIInstrumentation } from '@traceloop/instrumentation-openai';

const globalWithOtel = globalThis as typeof globalThis & {
	__otelInitialized?: boolean;
};

if (!globalWithOtel.__otelInitialized) {
	const exporter = new OTLPTraceExporter({
		url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT ?? 'http://localhost:4318/v1/traces'
	});

	const provider = new NodeTracerProvider({
		resource: resourceFromAttributes({
			'service.name': process.env.OTEL_SERVICE_NAME ?? 'fullscope-media'
		}),
		spanProcessors: [new SimpleSpanProcessor(exporter)]
	});

	provider.register();

	registerInstrumentations({
		instrumentations: [new OpenAIInstrumentation()]
	});

	globalWithOtel.__otelInitialized = true;
}
