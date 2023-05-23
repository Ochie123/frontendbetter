import React from "react"
import Label from '../../../../components/Label'

export const applyFilters = (results, query, filters) => {
  return results.filter(result => {
    let matches = true

    if (query && !result.name.toLowerCase().includes(query.toLowerCase())) {
      matches = false
    }

    if (filters.category && result.category !== filters.category) {
      matches = false
    }

    if (filters.availability) {
      if (filters.availability === 'active' && !result.active) {
        matches = false
      }

      if (filters.availability === 'inactive' && result.active) {
        matches = false
      }
    }

    if (
      filters.inStock &&
      !["in_stock", "limited"].includes(result.inventoryType)
    ) {
      matches = false
    }

    if (filters.bestdeals && !result.bestdeals) {
      matches = false
    }

    return matches
  })
}

export const applyPagination = (results, page, limit) => {
  return results.slice(page * limit, page * limit + limit)
}

export const getInventoryLabel = inventoryType => {
  const map = {
    in_stock: {
      text: "In Stock",
      color: "success"
    },
    limited: {
      text: "Limited",
      color: "warning"
    },
    out_of_stock: {
      text: "Out of Stock",
      color: "error"
    }
  }

  const { text, color } = map[inventoryType]

  return <Label color={color}>{text}</Label>
}
