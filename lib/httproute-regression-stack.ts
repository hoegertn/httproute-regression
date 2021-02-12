import * as cdk from '@aws-cdk/core';
import * as api from '@aws-cdk/aws-apigatewayv2';
import * as integ from '@aws-cdk/aws-apigatewayv2-integrations';
import * as lambda from '@aws-cdk/aws-lambda';
export class ApiStack extends cdk.Stack {

  public readonly api: api.HttpApi;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.api = new api.HttpApi(this, 'Api', {
      //
    });

  }
}

export interface RouteStackProps extends cdk.StackProps {
  api: ApiStack;
}

export class RouteStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: RouteStackProps) {
    super(scope, id, props);

    const fn = new lambda.Function(this, 'Function', {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromInline('Foobar'),
      handler: 'index.handler',
    });
    new api.HttpRoute(this, 'Route', {
      httpApi: props.api.api,
      integration: new integ.LambdaProxyIntegration({ handler: fn }),
      routeKey: api.HttpRouteKey.with('/test', api.HttpMethod.GET),
    });
  }
}
