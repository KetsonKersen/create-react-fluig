#!/usr/bin/env node
import fs from "fs-extra"
import path from "path"
import prompts from "prompts"
import { execa } from "execa"
import chalk from "chalk"

const cwd = process.cwd()

;(async () => {
  console.log(chalk.cyan.bold("🚀 Criando novo projeto React-Fluig...\n"))

  const response = await prompts(
    [
      {
        type: "select",
        name: "template",
        message: "Escolha o tipo de template:",
        choices: [
          { title: "Form", value: "form" },
          { title: "WCM - Widget", value: "widget" },
        ],
        initial: 0,
      },
      {
        type: "text",
        name: "projectName",
        message: "Nome do projeto:",
        validate: (value) =>
          value.trim().length > 0 ? true : "Nome do projeto é obrigatório",
      },
    ],
    {
      onCancel: () => {
        console.log(chalk.red("\n❌ Operação cancelada pelo usuário"))
        process.exit(0)
      },
    }
  )

  const projectDir = path.join(cwd, response.projectName)

  if (fs.existsSync(projectDir)) {
    console.error(chalk.red.bold("❌ Diretório já existe!"))
    process.exit(1)
  }

  const templates = {
    form: "https://github.com/KetsonKersen/react-fluig-template.git",
    widget: "https://github.com/KetsonKersen/react-fluig-widget-template.git",
  }

  const repoURL = templates[response.template]

  console.log(
    chalk.blue(
      `🌐 Clonando template ${chalk.bold(response.template)} do GitHub...\n`
    )
  )

  await execa("git", ["clone", "--depth=1", repoURL, projectDir], {
    stdio: "inherit",
  })

  await fs.remove(path.join(projectDir, ".git"))

  const templateInfo = {
    form: {
      name: "Form",
      repoLink: "https://github.com/KetsonKersen/react-fluig-template",
    },
    widget: {
      name: "WCM - Widget",
      repoLink: "https://github.com/KetsonKersen/react-fluig-widget-template",
    },
  }

  const info = templateInfo[response.template]

  console.log("\n" + chalk.green.bold("✅ Projeto criado com sucesso!"))
  console.log(chalk.yellow("─────────────────────────────────────────"))
  console.log(chalk.white(`🔗 Acesse: ${chalk.cyan(info.repoLink)}`))
  console.log(
    chalk.white(
      `📂 Entre no diretório: ${chalk.cyan(`cd ${response.projectName}`)}`
    )
  )
  console.log(
    chalk.white(`🚀 Instale dependências: ${chalk.cyan("npm install")}`)
  )
  console.log(chalk.white(`⚡ Inicie o ambiente: ${chalk.cyan("npm run dev")}`))
  console.log(chalk.yellow("─────────────────────────────────────────\n"))
})()
