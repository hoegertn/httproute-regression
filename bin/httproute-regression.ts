#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { ApiStack, RouteStack } from '../lib/httproute-regression-stack';

const app = new cdk.App();
const api = new ApiStack(app, 'ApiStack');
new RouteStack(app, 'RouteStack', {api});
