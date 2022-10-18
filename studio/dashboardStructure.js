export default {
  widgets: [
    {
      name: 'last-edited',
      options: {
        title: 'Recently edited',
        order: '_updatedAt desc',
        limit: 10,
        types: ['page']
      },
      layout: { width: 'medium' }
    },
    {
      name: 'project-details',
      layout: {
        width: 'medium'
      }
    }
  ]
}
