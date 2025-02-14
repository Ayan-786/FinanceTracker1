from django.core.management.base import BaseCommand
from django.db import transaction

from main.telegram import main


class Command(BaseCommand):
    help = 'Loads all fixtures'

    @transaction.atomic
    def handle(self, *args, **options):
        main()
