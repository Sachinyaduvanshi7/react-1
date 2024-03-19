// import express_prom_bundle from "express-prom-bundle";
const express_prom_bundle = require("express-prom-bundle");
const metricsMiddleware = express_prom_bundle({
  includeStatusCode: true,
  includeMethod: true,
  includePath: true,
  customLabels: {
    project_name: "groot",
    project_type: "nodejs",
  },
  metricType: "summary",
  promClient: {
    collectDefaultMetrics: {},
  },
});

module.exports = metricsMiddleware;
