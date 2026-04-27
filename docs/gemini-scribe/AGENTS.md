# AGENTS.md

This file provides context about this Obsidian vault for AI agents.

## Vault Overview

This vault is a comprehensive product management and technical documentation repository for a gaming-related platform project, likely centered around a game library and challenge tracking system. It serves to define the product's functional requirements, user experience, and underlying system architecture.

## Organization

The vault is highly structured, utilizing a domain-driven folder hierarchy and a strict numerical naming convention for requirements. The primary organization is split between `Produto` (Product) for functional specifications and `Sistema` (System) for technical implementation details.

Key organizational patterns include:
- **Requirement Hierarchy**: Uses prefixes like **DRP** (Documento de Requisitos de Produto) for high-level features and **RF** (Requisito Funcional) for specific functionalities, organized into numbered folders (e.g., DRP 01, DRP 02).
- **Template-Driven**: A `_modelos` folder contains standardized templates for DRPs, Functional Requirements, and refinements, ensuring consistency across the vault.
- **Technical Segregation**: The `Sistema` folder isolates architectural diagrams, stack research (Svelte, Supabase), and monitoring guides from the product requirements.

## Key Topics

- User Management (Registration, Authentication, and Session Persistence)
- Game Catalog Management (Games, DLCs, and Metadata Auto-fill)
- Player Libraries (Game appropriation and personal collections)
- Challenge Tracking (Recording, categorizing, and concluding gaming challenges)
- Platform UI/UX (Player dashboards and public profiles)
- Technical Stack (Svelte, Supabase, and System Architecture)
- Product Strategy (MVP definition, Personas, and Backlog management)

## User Preferences

The user follows a formal, technical, and highly organized writing style. They prefer detailed, atomic notes for functional requirements and value consistency in documentation structure, as evidenced by the use of predefined templates.

Responses should be precise and structured, respecting the established hierarchical numbering system. The user likely prefers technical accuracy and professional terminology (in Portuguese) when discussing product features or system architecture.

## Custom Instructions

- Always follow the hierarchical numbering convention (DRP XX / RF XX.XX) when suggesting new notes or features.
- Reference the templates in `_modelos/Documentação de produto/` when drafting or refining requirements.
- When discussing technical implementation, prioritize the documented stack (Svelte and Supabase) located in `Sistema/Stack/`.
- Maintain the separation between 'what' the product does (found in `Produto/`) and 'how' it is built (found in `Sistema/`).
