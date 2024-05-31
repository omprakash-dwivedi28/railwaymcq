# In your Django app, create a new management command file, e.g., import_data.py

import csv
from datetime import datetime
from django.core.management.base import BaseCommand
from railwaymcq.api.models import YourModel  # Import your Django model

class Command(BaseCommand):
    help = 'Import data from CSV file'

    def add_arguments(self, parser):
        parser.add_argument('csv_file', type=str, help='Path to the CSV file')

    def handle(self, *args, **kwargs):
        csv_file = kwargs['csv_file']

        with open(csv_file, 'r') as file:
            reader = csv.DictReader(file)
            for row in reader:
                # Create or update model instance
                obj, created = YourModel.objects.update_or_create(
                    qcode=row['qcode'],
                    defaults={
                        'report': row['report'],
                        'agreereport': row['agreereport'],
                        'subcode': row['subcode'],
                        'topcode': row['topcode'],
                        'validity': row['validity'],
                        'difficulty': row['difficulty'],
                        'question': row['question'],
                        'option1': row['option1'],
                        'option2': row['option2'],
                        'option3': row['option3'],
                        'option4': row['option4'],
                        'answer': row['answer'],
                        'Reference': row['Reference'],
                        'datetime': datetime.strptime(row['datetime'], '%Y-%m-%d %H:%M:%S'),
                        'ip': row['ip'],
                    }
                )

                if created:
                    self.stdout.write(self.style.SUCCESS(f'Created: {obj}'))
                else:
                    self.stdout.write(self.style.SUCCESS(f'Updated: {obj}'))
