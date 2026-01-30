# n8n-nodes-cloudia

This is an n8n community node. It lets you use Cloudia API in your n8n workflows.

Cloudia is an AI chatbot platform for healthcare scheduling.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

- [Installation](#installation)
- [Operations](#operations)
- [Credentials](#credentials)
- [Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

### Messages
- [ ] Retrieve customers
- [ ] Create customer
- [ ] Retrieve conversations
- [ ] Retrieve messages for a customer
- [x] Whatsapp Web
    - [x] Send text message
    - [x] Send options list message
    - [x] Send image message
    - [x] Send video message
    - [x] Send document message
    - [x] Send audio message
    - [x] Send location message
    - [x] Send contact message
- [x] Whatsapp Gupshup
    - [x] Send text template message
    - [x] Send image template message
    - [x] Send video template message
    - [x] Send document template message
    - [x] Send location template message

### Bot
- [ ] Enable bot for customer
- [ ] Disable bot for customer

### Stage
- [x] Update customer stage

### Sequence
- [x] Add customer to sequence
- [x] Remove customer from sequence

### TAG
- [x] Add tag to customer
- [x] Remove tag from customer

### Attendant
- [x] Assign user to customer
- [x] Unassign user from customer

## Credentials

To get your Cloudia API key, access the [Cloudia Members Area](https://app.cloudiabot.com/), in the [`Integrações - WhatsApp API`](https://app.cloudiabot.com/apiwhatsapp) menu (or access directly through the link: https://app.cloudiabot.com/apiwhatsapp) and copy the Token value.

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
* [Cloudia API documentation](https://documenter.getpostman.com/view/33208544/2sA358eRmb)
