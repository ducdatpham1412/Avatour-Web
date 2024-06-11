export function getCategoriesByServices(services: Service[]) {
  const categoriesCount: Record<string, number> = {};

  let mostFrequentCategory;
  let secondMostFrequentCategory;

  let largestCount = 0;
  let secondLargestCount = 0;

  services.forEach(service => {
    let category;

    switch (service) {
      case 'culture':
      case 'creative':
      case 'art':
        category = 'Văn hoá';
        break;
      case 'history':
        category = 'Lịch sử';
        break;
      case 'museum':
      case 'check-in':
      case 'flower':
      case 'book':
        category = 'Tham quan';
        break;
      case 'mountain':
      case 'cave':
      case 'water':
      case 'other-backpack':
        category = 'Khám phá';
        break;
      case 'pagoda':
      case 'catholic':
        category = 'Tôn giáo';
        break;
      case 'beach':
      case 'park':
      case 'pub':
      case 'shopping':
      case 'fishing':
      case 'entertainment':
        category = 'Giải trí';
        break;
      case 'breakfast':
      case 'lunch':
      case 'dinner':
      case 'other-food':
      case 'tea':
      case 'other-drink':
        category = 'Ẩm thực';
        break;
      case 'volunteer':
        category = 'Tình nguyện';
        break;
      case 'camping':
        category = 'Cắm trại';
        break;
      case 'team-building':
        category = 'Team building';
        break;
    }

    if (!category) return;

    if (category in categoriesCount) {
      categoriesCount[category] += 1;
    } else {
      categoriesCount[category] = 1;
    }

    if (categoriesCount[category] > largestCount) {
      largestCount = categoriesCount[category];
    }
  });

  for (const category in categoriesCount) {
    if (largestCount === categoriesCount[category]) {
      if (mostFrequentCategory) {
        return [mostFrequentCategory, category];
      }
      mostFrequentCategory = category;
    } else {
      const isFirstValue = !secondLargestCount;
      const isNewValidValue = largestCount - categoriesCount[category] < secondLargestCount;
      if (isFirstValue || isNewValidValue) {
        secondLargestCount = largestCount - categoriesCount[category];
        secondMostFrequentCategory = category;
      }
    }
  }

  return [mostFrequentCategory, secondMostFrequentCategory].filter(e => e !== undefined);
}
