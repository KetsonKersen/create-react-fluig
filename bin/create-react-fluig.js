#!/usr/bin/env node
import fs from "fs-extra"
import path from "path"
import prompts from "prompts"
import { execa } from "execa"
import chalk from "chalk"

const cwd = process.cwd()

;(async () => {
  console.log(chalk.cyan.bold("🚀 Criando novo projeto React-Fluig...\n"))

  const response = await prompts({
    type: "text",
    name: "projectName",
    message: "Nome do projeto:",
  })

  const projectDir = path.join(cwd, response.projectName)

  if (fs.existsSync(projectDir)) {
    console.error(chalk.red.bold("❌ Diretório já existe!"))
    process.exit(1)
  }

  const repoURL = "https://github.com/KetsonKersen/react-fluig-template.git"

  console.log(chalk.blue("🌐 Clonando monorepo do GitHub...\n"))
  await execa("git", ["clone", "--depth=1", repoURL, projectDir], {
    stdio: "inherit",
  })

  await fs.remove(path.join(projectDir, ".git"))

  console.log("\n" + chalk.green.bold("✅ Projeto criado com sucesso!"))
  console.log(chalk.yellow("─────────────────────────────────────────"))
  console.log(chalk.white(`⚠️ Instale a extenção do chrome!`))
  console.log(
    chalk.white(
      `🔗 Acesse: ${chalk.cyan(
        "https://github.com/KetsonKersen/react-fluig-template"
      )}`
    )
  )
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
