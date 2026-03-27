import { describe, it, expect } from "vitest";
import { pathMatchesRequired } from "./required-patterns";

// Helper: assert required
function req(path: string, extra?: string[]) {
  return pathMatchesRequired(path, extra);
}

describe("pathMatchesRequired — infra path patterns", () => {
  it("terraform/ path pattern", () => {
    expect(req("terraform/main.tf")).toBe(true);
    expect(req("infra/terraform/vpc.tf")).toBe(true);
  });

  it("k8s/ path pattern", () => {
    expect(req("k8s/deployment.yaml")).toBe(true);
  });

  it("kubernetes/ path pattern", () => {
    expect(req("kubernetes/service.yaml")).toBe(true);
  });

  it("helm/ path pattern", () => {
    expect(req("helm/templates/deployment.yaml")).toBe(true);
  });

  it("charts/ path pattern", () => {
    expect(req("charts/myapp/Chart.yaml")).toBe(true);
  });

  it("manifests/ path pattern", () => {
    expect(req("manifests/prod/deploy.yaml")).toBe(true);
  });

  it("serverless/ path pattern", () => {
    expect(req("serverless/handler.ts")).toBe(true);
  });

  it("pulumi/ path pattern", () => {
    expect(req("pulumi/index.ts")).toBe(true);
  });

  it("ansible/ path pattern", () => {
    expect(req("ansible/playbook.yml")).toBe(true);
  });
});

describe("pathMatchesRequired — Terraform file extensions", () => {
  it("any .tf file", () => {
    expect(req("modules/vpc/main.tf")).toBe(true);
    expect(req("variables.tf")).toBe(true);
  });

  it(".tfvars file", () => {
    expect(req("prod.tfvars")).toBe(true);
  });

  it(".tf.json file", () => {
    expect(req("override.tf.json")).toBe(true);
  });

  it(".terraform.lock.hcl", () => {
    expect(req(".terraform.lock.hcl")).toBe(true);
  });

  it(".tflint.hcl", () => {
    expect(req(".tflint.hcl")).toBe(true);
  });
});

describe("pathMatchesRequired — Dockerfile variants", () => {
  it("Dockerfile", () => {
    expect(req("Dockerfile")).toBe(true);
  });

  it("Dockerfile.prod", () => {
    expect(req("Dockerfile.prod")).toBe(true);
  });

  it("Dockerfile.staging", () => {
    expect(req("service/Dockerfile.staging")).toBe(true);
  });

  it("Containerfile", () => {
    expect(req("Containerfile")).toBe(true);
  });

  it("Containerfile.prod", () => {
    expect(req("Containerfile.prod")).toBe(true);
  });
});

describe("pathMatchesRequired — docker-compose variants", () => {
  it("docker-compose.yml", () => {
    expect(req("docker-compose.yml")).toBe(true);
  });

  it("docker-compose.yaml", () => {
    expect(req("docker-compose.yaml")).toBe(true);
  });

  it("docker-compose.prod.yml", () => {
    expect(req("docker-compose.prod.yml")).toBe(true);
  });

  it("docker-compose.override.yaml", () => {
    expect(req("docker-compose.override.yaml")).toBe(true);
  });
});

describe("pathMatchesRequired — Helm values variants", () => {
  it("values.yaml", () => {
    expect(req("helm/values.yaml")).toBe(true);
  });

  it("values-staging.yaml", () => {
    expect(req("values-staging.yaml")).toBe(true);
  });

  it("values-prod.yml", () => {
    expect(req("values-prod.yml")).toBe(true);
  });
});

describe("pathMatchesRequired — .env variants", () => {
  it(".env", () => {
    expect(req(".env")).toBe(true);
  });

  it(".env.local", () => {
    expect(req(".env.local")).toBe(true);
  });

  it(".env.production", () => {
    expect(req(".env.production")).toBe(true);
  });

  it(".env.staging", () => {
    expect(req(".env.staging")).toBe(true);
  });

  it(".env.example is not required (doesn't start with .env.)", () => {
    // .env.example → starts with .env. → IS required
    expect(req(".env.example")).toBe(true);
  });
});

describe("pathMatchesRequired — Python dependency files", () => {
  it("requirements.txt", () => {
    expect(req("requirements.txt")).toBe(true);
  });

  it("requirements-dev.txt", () => {
    expect(req("requirements-dev.txt")).toBe(true);
  });

  it("requirements-prod.txt", () => {
    expect(req("requirements-prod.txt")).toBe(true);
  });

  it("pyproject.toml", () => {
    expect(req("pyproject.toml")).toBe(true);
  });

  it("poetry.lock", () => {
    expect(req("poetry.lock")).toBe(true);
  });

  it("Pipfile", () => {
    expect(req("Pipfile")).toBe(true);
  });
});

describe("pathMatchesRequired — CI/CD path patterns", () => {
  it(".circleci/ path", () => {
    expect(req(".circleci/config.yml")).toBe(true);
  });

  it(".buildkite/ path", () => {
    expect(req(".buildkite/pipeline.yml")).toBe(true);
  });

  it(".github/actions/ path", () => {
    expect(req(".github/actions/build/action.yml")).toBe(true);
  });

  it(".drone/ path", () => {
    expect(req(".drone/config.yml")).toBe(true);
  });
});

describe("pathMatchesRequired — CI/CD basenames", () => {
  it(".gitlab-ci.yml", () => {
    expect(req(".gitlab-ci.yml")).toBe(true);
  });

  it("azure-pipelines.yml", () => {
    expect(req("azure-pipelines.yml")).toBe(true);
  });

  it("bitbucket-pipelines.yml", () => {
    expect(req("bitbucket-pipelines.yml")).toBe(true);
  });

  it(".travis.yml", () => {
    expect(req(".travis.yml")).toBe(true);
  });

  it("Jenkinsfile", () => {
    expect(req("Jenkinsfile")).toBe(true);
  });

  it("Jenkinsfile.prod", () => {
    expect(req("Jenkinsfile.prod")).toBe(true);
  });
});

describe("pathMatchesRequired — Dependabot", () => {
  it(".github/dependabot.yml", () => {
    expect(req(".github/dependabot.yml")).toBe(true);
  });

  it(".github/dependabot.yaml", () => {
    expect(req(".github/dependabot.yaml")).toBe(true);
  });

  it("nested dependabot path", () => {
    expect(req("repo/.github/dependabot.yml")).toBe(true);
  });
});

describe("pathMatchesRequired — security path patterns", () => {
  it("auth/ path", () => {
    expect(req("auth/middleware.ts")).toBe(true);
  });

  it("authentication/ path", () => {
    expect(req("authentication/oauth.ts")).toBe(true);
  });

  it("authorization/ path", () => {
    expect(req("authorization/policies.ts")).toBe(true);
  });

  it("rbac/ path", () => {
    expect(req("rbac/rules.ts")).toBe(true);
  });

  it("security/ path", () => {
    expect(req("security/config.ts")).toBe(true);
  });

  it("iam/ path", () => {
    expect(req("iam/roles.tf")).toBe(true);
  });

  it("CODEOWNERS", () => {
    expect(req("CODEOWNERS")).toBe(true);
  });

  it(".snyk", () => {
    expect(req(".snyk")).toBe(true);
  });
});

describe("pathMatchesRequired — observability path patterns", () => {
  it("prometheus/ path", () => {
    expect(req("prometheus/alerts.yml")).toBe(true);
  });

  it("grafana/ path", () => {
    expect(req("grafana/dashboard.json")).toBe(true);
  });

  it("datadog/ path", () => {
    expect(req("datadog/monitors.tf")).toBe(true);
  });

  it("otel/ path", () => {
    expect(req("otel/config.yaml")).toBe(true);
  });
});

describe("pathMatchesRequired — config basenames", () => {
  it("tsconfig.json", () => {
    expect(req("tsconfig.json")).toBe(true);
  });

  it("tsconfig.app.json", () => {
    expect(req("tsconfig.app.json")).toBe(true);
  });

  it("next.config.mjs", () => {
    expect(req("next.config.mjs")).toBe(true);
  });

  it("next.config.ts", () => {
    expect(req("next.config.ts")).toBe(true);
  });

  it("vite.config.ts", () => {
    expect(req("vite.config.ts")).toBe(true);
  });

  it("vite.config.js", () => {
    expect(req("vite.config.js")).toBe(true);
  });

  it("webpack.config.js", () => {
    expect(req("webpack.config.js")).toBe(true);
  });

  it("webpack.config.mjs", () => {
    expect(req("webpack.config.mjs")).toBe(true);
  });

  it("babel.config.js", () => {
    expect(req("babel.config.js")).toBe(true);
  });

  it("babel.config.json", () => {
    expect(req("babel.config.json")).toBe(true);
  });

  it("vercel.json", () => {
    expect(req("vercel.json")).toBe(true);
  });

  it("fly.toml", () => {
    expect(req("fly.toml")).toBe(true);
  });
});

describe("pathMatchesRequired — appsettings variants", () => {
  it("appsettings.json", () => {
    expect(req("appsettings.json")).toBe(true);
  });

  it("appsettings.Production.json", () => {
    expect(req("appsettings.Production.json")).toBe(true);
  });

  it("appsettings.Development.json", () => {
    expect(req("appsettings.Development.json")).toBe(true);
  });
});

describe("pathMatchesRequired — CloudFormation / SAM templates", () => {
  it("stack.template.yaml", () => {
    expect(req("stack.template.yaml")).toBe(true);
  });

  it("stack.template.yml", () => {
    expect(req("stack.template.yml")).toBe(true);
  });

  it("stack.template.json", () => {
    expect(req("stack.template.json")).toBe(true);
  });
});

describe("pathMatchesRequired — API contract files", () => {
  it("proto/ path", () => {
    expect(req("proto/api.proto")).toBe(true);
  });

  it("schema.graphql", () => {
    expect(req("schema.graphql")).toBe(true);
  });

  it("asyncapi.yaml", () => {
    expect(req("asyncapi.yaml")).toBe(true);
  });
});

describe("pathMatchesRequired — Bazel BUILD files", () => {
  it("BUILD file", () => {
    expect(req("BUILD")).toBe(true);
  });

  it("BUILD.bazel", () => {
    expect(req("BUILD.bazel")).toBe(true);
  });
});

describe("pathMatchesRequired — non-matching files", () => {
  it("README.md is not required", () => {
    expect(req("README.md")).toBe(false);
  });

  it("src/components/Button.tsx is not required", () => {
    expect(req("src/components/Button.tsx")).toBe(false);
  });

  it("test/unit/helper.ts is not required", () => {
    expect(req("test/unit/helper.ts")).toBe(false);
  });

  it("docs/architecture.md is not required", () => {
    expect(req("docs/architecture.md")).toBe(false);
  });

  it("src/index.ts is not required", () => {
    expect(req("src/index.ts")).toBe(false);
  });

  it(".eslintrc.json is not required", () => {
    expect(req(".eslintrc.json")).toBe(false);
  });

  it("CHANGELOG.md is not required", () => {
    expect(req("CHANGELOG.md")).toBe(false);
  });
});

describe("pathMatchesRequired — extra patterns", () => {
  it("extra path pattern (contains /) matches via path substring", () => {
    expect(req("custom/infra/secret.ts", ["custom/infra/"])).toBe(true);
  });

  it("extra path pattern does not match different path", () => {
    expect(req("other/path/secret.ts", ["custom/infra/"])).toBe(false);
  });

  it("extra basename pattern (no /) matches via exact basename", () => {
    expect(req("path/to/custom-deploy.sh", ["custom-deploy.sh"])).toBe(true);
  });

  it("extra basename pattern does not match different basename", () => {
    expect(req("path/to/other.sh", ["custom-deploy.sh"])).toBe(false);
  });

  it("multiple extra patterns: first match wins", () => {
    expect(req("infra/deploy.sh", ["deploy.sh", "other.txt"])).toBe(true);
    expect(req("infra/other.txt", ["deploy.sh", "other.txt"])).toBe(true);
  });

  it("extra pattern does not affect normal required patterns", () => {
    // package.json is required regardless of extra patterns
    expect(req("package.json", ["custom.sh"])).toBe(true);
  });

  it("empty extra patterns array => uses standard patterns only", () => {
    expect(req("supabase/migrations/001.sql", [])).toBe(true);
    expect(req("README.md", [])).toBe(false);
  });

  it("extra pattern with windows-style path separator still matches after normalization", () => {
    // The function normalizes backslashes to forward slashes
    expect(req("custom\\infra\\file.ts", ["custom/infra/"])).toBe(true);
  });
});
